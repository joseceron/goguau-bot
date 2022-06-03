'use strict'
require('dotenv').config(); //get environment variables

module.exports = {
  greetings: function() {
    let reply = [];
    let suggestions = [];
    let contexts = [];
    console.log('INTENT: \'greetings\'')

    reply.push('¡Hola! Soy Guaudina la asistente virtual de Go Guau (Un bot)')
    reply.push('¿Qué servicio deseas consultar?')
    suggestions.push('Paseos')
    suggestions.push('Adiestramiento')
    suggestions.push('Productos')
    suggestions.push('Atención personalizada')

    return {
      replies: reply,
      suggestions,
      contexts,
    }
  }
};
