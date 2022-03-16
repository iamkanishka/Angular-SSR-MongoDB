import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
//import {Firestore,collection,collectionData} from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import {SeoserviceService} from '../seoservice.service'
import {tap,startWith} from 'rxjs/operators'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss']
})
export class AnimalDetailComponent implements OnInit {

animal$:any

  
  constructor(
    private afs:AngularFirestoreDocument,
    private seo:SeoserviceService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('name')?.toLocaleLowerCase();
    this.animal$=this.afs.collection('animals').doc(`${id}`).valueChanges().pipe(tap((animal:any)=>{
      this.seo.generateTags({
        title:animal.name,
        description:animal.bio,
        image:animal.imageURL
      })
    }))
  }


}
