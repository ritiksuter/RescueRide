export class SosDTO {
  constructor({
    id,
    userId,
    mechanicId,
    lat,
    lng,
    status,
    createdAt,
  }) {
    this.id = id;
    this.userId = userId;
    this.mechanicId = mechanicId;
    this.lat = lat;
    this.lng = lng;
    this.status = status;
    this.createdAt = createdAt;
  }
}
