import { Expose } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsArray } from 'class-validator';

export class PageData<T> {
  @Expose()
  @IsArray()
  content: T[];

  @Expose()
  @IsNumber()
  totalElements: number;

  @Expose()
  @IsInt()
  totalPages: number;

  @Expose()
  @IsBoolean()
  hasPrevious: boolean;

  @Expose()
  @IsBoolean()
  hasNext: boolean;

  @Expose()
  @IsInt()
  number: number;

  @Expose()
  @IsInt()
  size: number;

  constructor(
    content: T[],
    totalElements: number,
    totalPages: number,
    hasPrevious: boolean,
    hasNext: boolean,
    number: number,
    size: number,
  ) {
    this.content = content;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
    this.hasPrevious = hasPrevious;
    this.hasNext = hasNext;
    this.number = number;
    this.size = size;
  }

  static empty<T>(): PageData<T> {
    return new PageData<T>([], 0, 0, false, false, 0, 0);
  }

  static create<T>(
    content: T[],
    totalElements: number,
    page: number,
    size: number,
  ): PageData<T> {
    const totalPages = Math.ceil(totalElements / size);
    const hasPrevious = page > 1;
    const hasNext = page < totalPages;

    return new PageData(
      content,
      totalElements,
      totalPages,
      hasPrevious,
      hasNext,
      page,
      size,
    );
  }
}
