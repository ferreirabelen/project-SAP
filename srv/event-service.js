const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
  const { Events } = this.entities;

  this.on('READ', 'Events', async (req) => {
    console.log('Solicitud de eventos:', req.query);
    return SELECT.from(Events);
  });

  this.on('cancelEvent', async (req) => {
    const { eventId } = req.data; 

    const event = await this.read('my.Event').where({ ID: eventId });

    if (event.length === 0) {
      req.error(404, 'Event not found');
      return;
    }

    await this.update('my.Event')
      .set({ IsCancelled: true })
      .where({ ID: eventId });

    return { result: 'Event cancelled successfully' };
  });
  
});






