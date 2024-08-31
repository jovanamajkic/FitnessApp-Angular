import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { defer, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private firestorage: AngularFireStorage) { }

  uploadImage(image: File): Observable<string> {
    return defer(async () => {
      const path = image.name;
      const uploadTask = await this.firestorage.upload(path, image).task;
      const dowloadUrl = await uploadTask.ref.getDownloadURL();
      return dowloadUrl;
    })
  }

  getUrl(path: string): Observable<string> | null {
    return this.firestorage.ref(path).getDownloadURL();
  }
}
