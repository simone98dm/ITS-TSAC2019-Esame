# Contesto

MondoClean deve misurare dei nastri trasportatori, il nastro è composto da:

- id (numerico)
- velocità (metri/minuto)
- consumo (W)

L'azienda necessità di sapere la velocità dei nastri, o del singolo, ogni 30 secondi. Nel caso il nastro iniziasse a superare la soglia di consumo, che è di 40W, allora viene inviato subito il messaggio di `warning` all'operatore.

## Payload structure

Si è deciso di strutturare il payload con le seguenti informazioni:

```json
{
	"id": 0,
	"speed": "35",
	"consume": "40",
	"time": 102030123
}
```

L'`id` rappresenta un codice/numero univoco che identifica il nastro all'interno dell'azienda, `speed` e `consume` sono rispettivamente la velocità e il consumo del nastro (sono stati considerati come stringhe e non come valori interi), `time` è l'esatto momento in cui è stato rilevato il dato (rappresentato come intero dato che la data è rappresentata dai millisecondi).

### In caso di emergenza

Nel caso il nastro superi la soglia, il sistema invia il payload `direttamente` alla pagina web ('_bypassando_' la struttura di salvataggio che potrebbe essere satura e quindi potrebbe causare un ritardo nella ricezione rilevante, sfavorendo l'immediata risoluzione del problema).

La scelta di salvare sul database i valori dei sensori come stringhe invece che valori `double` o `float`, è data dal fatto che non si tiene in considerazione di eseguire operazioni aritmetiche sui dati.

## Use case diagram

![1](https://github.com/simone98dm/TSAC2019-Esame/blob/images/1.png)

## Sequence diagram

![sequence-diagram](https://github.com/simone98dm/TSAC2019-Esame/blob/images/sequence-diagram.png)

## Architecture diagram

![store-wq-consumer-api](https://github.com/simone98dm/TSAC2019-Esame/blob/images/store-wq-consumer-api.png)

Tutto il progetto è basato su una macchina `EC2` di `AWS`, la scelta è stata dettata dalla familiarità con il servizio. Ma non per questo motivo è obbligatorio usare questo servizio, di fatto essendo che la struttura per funzionare deve avere alla basa una macchina virtuale, si può usare anche altri servizi cloud `Azure`, `Digital Ocean` ecc...

La scelta di usare 2 code distinte per la trasmissione dei messaggi è data dal fatto che: la prima queue, che si basa sul pattern `working-queue`, contiene tutti i messaggi che devono essere salvati nel database, di fatto a meno che non gli si da la conferma, la working queue tiene in memoria i messaggi e gli cancella solo dopo aver confermato la loro lettura. La seconda, invece, usa il pattern `publish-subscribe`, che si differenzia dalla prima in quanto non tiene in memoria i dati ricevuti e quindi risulta più adatta per la notifica all'operatore connesso in caso di guasti. Inoltre l'utilizzo di una seconda queue è per garantire la massima velocità nella rilevazione del problema e nella conseguente risoluzione.

Il `database` è salvato in locale, non è stato usato nessun servizio offerto da AWS, la decisione è stata presa per la comodità e valocità durante lo sviluppo. Il consiglio è quello di usare un servizo come `RDS` offerto da `AWS` o `Azure`.

Lo `store-endpoint` è il componente fondamentale per funzionamento della ricezione dei dati e il loro successivo salvataggio, è stato deciso di creare un progetto a parte in quanto il processo si occupa solo di ricevere e inviare i dati, quindi è dedicato completamente a questa operazione, e sarebbe stato più facile scalare.

Le `API` sono dedicate esclusivamente al ricevere comandi dal `frontend`, in questo caso si ripete la logica precedente, le operazioni che deve svolgere sono semplici e precise e non vanno ad affaticare tutta la struttura, infine è più facile scalare qual'ora sarebbe stato necessario.
