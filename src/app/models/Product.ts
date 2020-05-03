import { IProduct } from '../types/IProduct';

export class Product implements IProduct {
  constructor(
    public id: number,
    public title: string,
    public cover: string,
    public description: string,
    public discount: number,
    public price: number,
    public stock: number,
    public available: boolean,
    public createdAt: string
  ) {}

  incrementStock(): void {
    this.stock++;
    this.updateAvailable()
  }

  restoreStock(value: number): void {
    this.stock += value;
    this.updateAvailable();
  }

  decrementStock(): void {
    if (this.stock > 0) {
      this.stock--;
    }
    this.updateAvailable()
  }

  updateAvailable(): void {
    this.available = true;
    if (this.stock === 0) {
      this.available = false;
    }
  }
}
