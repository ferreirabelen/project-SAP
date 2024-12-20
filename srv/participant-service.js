const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
  const { Participants } = this.entities;

  this.on('READ', 'Participants', async (req) => {
    console.log('Solicitud de participantes:', req.query);
    return SELECT.from(Participants);
  });

  const BPService = await cds.connect.to('API_BUSINESS_PARTNER');
    async function validateBusinessPartner(businessPartnerId) {
        const result = await BPService.read('A_BusinessPartner').where({ BusinessPartner: businessPartnerId });
        return result.length > 0; 
    }
    this.on('createParticipant', async (req) => {
        const { BusinessPartnerID } = req.data;

        if (!BusinessPartnerID) {
            req.error(400, 'BusinessPartnerID is required');
            return;
        }

        const isValid = await validateBusinessPartner(BusinessPartnerID);
        if (!isValid) {
            req.error(400, `Invalid BusinessPartnerID: ${BusinessPartnerID}`);
            return;
        }

        try {
            const newParticipant = await INSERT.into(Participants).entries(req.data);
            return newParticipant;
        } catch (error) {
            console.error('Error creating participant:', error);
            req.error(500, 'Failed to create participant');
        }
    });
    
});

    

