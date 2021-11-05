import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { INombre } from '../interfaces/inombre';

@Injectable({
  providedIn: 'root'
})
export class BdLocalService {
  viajes: INombre[]=[];
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
  }}