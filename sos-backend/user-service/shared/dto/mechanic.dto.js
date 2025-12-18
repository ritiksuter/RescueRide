export class MechanicDTO {
  constructor({
    id,
    name,
    phone,
    lat,
    lng,
    serviceType,
    rating,
    status,
  }) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.lat = lat;
    this.lng = lng;
    this.serviceType = serviceType;
    this.rating = rating;
    this.status = status;
  }
}
