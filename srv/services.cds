using my from '../db/schema';

service EventService @(path: 'test') {
  entity Events as projection on my.Event;
  entity Participants as projection on my.Participant;

  action cancelEvent(eventId: Integer, reason: String);
  action createParticipant(FirstName: String, LastName: String, Email: String, Phone: String, BusinessPartnerID: String);
}



