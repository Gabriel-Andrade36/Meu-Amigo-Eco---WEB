import { HotToastService } from '@ngneat/hot-toast';
import { from, Observable, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireStorage, GetDownloadURLPipe } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  uploadPercent!: Observable<number|undefined>;
  downloadURL!: Observable<string>;

  constructor(private storage: AngularFireStorage) { }

  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = this.storage.ref(path)
    const uploadTask = from(this.storage.upload(path,image))

    return uploadTask.pipe(
      switchMap(()=> storageRef.getDownloadURL())
      )
  }
}
