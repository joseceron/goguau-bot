'use strict'
require('dotenv').config(); //get environment variables
const { Image, Button } = require('actions-on-google')

module.exports = {
  walks: function() {
    let reply = [];
    let suggestions = [];
    let listCards = [];
    let contexts = [];
    let card = ''
    console.log('INTENT: \'walks\'')

  

    suggestions.push('Comprar')
    suggestions.push('Inicio')

    let items = [
      { id: 1, name: '1 mascotas'},
      { id: 2, name: '2 mascotas'},
      { id: 3, name: '3 mascotas'},
      { id: 4, name: '4 mascotas'},
    ]

    // items.map((item, i) => {
    //   let id = 'service_' + item.id
    //   let name = item.name

    //   let cardData = {
    //     key_name: id,
    //     key_values: {
    //       synonyms: [name + i],
    //       title: name,
    //       description: 'Servicio puerta a puerta: ',
    //       image: new Image({
    //         url: 'https://drive.google.com/file/d/1ubWduLheC2n8KP6f4KS8VIZ8JJEtMUQZ/view?usp=sharing',
    //         alt: 'permission'
    //       }),
    //     }
    //   }
    //   listCards.push(cardData)
    //   contexts.push({
    //     name: 'service-walk-intent',
    //     lifespan: 1,
    //     parameters: {}
    //   })
    // })
    card = {
      title: 'Paseo',
      subtitle: 'Máximo 4 mascotas',
      text: '**Descripción**: ' 
        + 'Servicio puerta a puerta' + '  \n' 
        + 'Usamos bolsas biodegradables' + '  \n' 
        + 'Paseadores son estudiantes universitarios' + '  \n' 
        + 'Amplia cobertura y flexibilidad en horarios' + '  \n' ,
      image: new Image({
          url: 'https://drive.google.com/file/d/1ubWduLheC2n8KP6f4KS8VIZ8JJEtMUQZ/view?usp=sharing',
          alt: 'permission'
      }),
      buttons: new Button({
          title: 'Whatsapp',
          url: 'https://api.whatsapp.com/send?phone=573194115792&text=Deseo'
      }),
      display: 'CROPPED'
    }

    reply.push('Selecciona una opción para continuar')

    return {
      replies: reply,
      cards: listCards,
      suggestions: suggestions,
      contexts: contexts,
      card,
  };
  }
};
