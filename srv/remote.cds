using {API_BUSINESS_PARTNER as bupa} from './external/API_BUSINESS_PARTNER';

service ProvidersService{
  entity Providers as projection on bupa.A_BusinessPartner{
  key BusinessPartner as ID,
  BusinessPartnerName as Name,
  BusinessPartnerIsBlocked as isBlocked
  }
}