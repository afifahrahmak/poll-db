"use strict";

class Softdrink {
  constructor(id, variant, name, genre, price, CompanyId, company, createdAt) {
    this.id = id;
    this.variant = variant;
    this.name = name;
    this.genre = genre;
    this.price = price;
    this.CompanyId = CompanyId;
    this.company = company;
    this.createdAt = createdAt;
  }

  get formatedDate() {
    return this.createdAt.toLocaleDateString("id");
  }
}

module.exports = Softdrink;
