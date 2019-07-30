# Contesto

MondoClean deve misurare dei nastri trasportatori, il nastro è composto da:

- id (numerico)
- velocità (metri/minuto)
- consumo (W)

L'azienda necessità di sapere la velocità dei nastri, o del singolo, ogni 30 secondi. Nel caso il nastro iniziasse a superare la soglia di consumo, che è di 40W, allora viene inviato subito il messaggio con il suo consumo.

### Payload structure

È stato deciso di strutturare il payload con le informazioni del nastro in questo modo:

```json
{
	"id":0,
	"speed": "35",
	"consume":"40"
}
```

Il messaggio è composto dall'id del nastro, la sua velocità rilevata e il suo consumo.

L'utilità di vedere sempre il consumo è dato da fatto che anche se il nastro non ha un'emergenza (supera la soglia dei 40W) possa comunque servire per poter fare considerazioni da parte dell'operatore.

#### In caso di emergenza

Nel caso il nastro superi la soglia, il sistema invia il payload direttamente alla pagina web, in maniera da poter garantire una visione immediata del problema.

La scelta di salvare sul database i valori dei sensori come stringhe invece che valori `double` o `float`, è data dal fatto che non si tiene in considerazione di eseguire operazioni aritmetiche sui dati.

## Use case diagram

![1](https://github.com/simone98dm/TSAC2019-Esame/blob/images/1.png)

## Sequence diagram

![sequence-diagram](https://github.com/simone98dm/TSAC2019-Esame/blob/images/sequence-diagram.png)

## Architecture diagram

![store-wq-consumer-api](https://github.com/simone98dm/TSAC2019-Esame/blob/images/store-wq-consumer-api.png)

Tutto il progetto è basato su una macchina `EC2` di `AWS`, la scelta è stata dettata dalla familiarità con il servizio.

La scelta di usare 2 code distinte per la trasmissione dei messaggi è data dal fatto che: la queue che si basa sul pattern `working-queue` contiene tutti i messaggi che sono IMPORTANTI da salvare nel db, di fatto a meno che non gli si da la conferma, la working queue tiene in memoria i messaggi e gli cancella solo dopo aver confermato la loro lettura. La seconda, invece, usa il pattern pubsub, che si differenzia dalla prima in quanto non tiene in memoria i dati ricevuti e quindi risulta adatta per la notifica all'operatore connesso in caso di guasti.

Il `database` è salvato in locale, non è stato usato nessun servizio offerto da AWS, la decisione è stata presa per la comodità nel caso si andasse a scalare.

Lo `store-endpoint` è il componente fondamentale per funzionamento della ricezione dei dati e il loro successivo salvataggio, è stato deciso di creare un progetto a parte in quanto il processo si occupa solo di ricevere e inviare i dati, quindi è dedicato completamente a questa operazione, inoltre sarebbe stato più facile scalare una singola parte del progetto invece che tutti. 

Le `API` sono dedicate esclusivamente al ricevere comandi da `frontend`, in questo caso si ripete il la logica precedente, le operazioni che deve svolgere sono semplici e precise e non vanno ad affaticare tutta la struttura, infine è più facile scalare qual'ora sarebbe stato necessario scalare.

