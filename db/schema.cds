namespace my;

entity Event {
  key ID: Integer;
  Name: String;
  StartDate: Date;
  EndDate: Date;
  Location: String;
  IsActive: Boolean;
  IsCancelled: Boolean;
  Participants: Association to many Participant on Participants.Event = $self;
}

entity Participant {
  key ID: Integer;
  FirstName: String;
  LastName: String;
  Email: String;
  Phone: String;
  BusinessPartnerID: String;
  Event: Association to Event;
}

entity Providers{
  ID: Integer;
  Name: String;
  isBlocked: Boolean;
}


