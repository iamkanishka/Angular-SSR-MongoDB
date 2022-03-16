import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {SeoserviceService} from '../seoservice.service'
import {tap,startWith} from 'rxjs/operators'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss']
})
export class AnimalDetailComponent implements OnInit {

animal$:any

  
  constructor(
    private http:HttpClient,
    private seo:SeoserviceService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    const animal = this.route.snapshot.paramMap.get('name')?.toLocaleLowerCase();
    this.animal$=this.seo.getanimal(String(animal)).pipe(tap((animal:any)=>{
      this.seo.generateTags({
        title:animal.data.animalname,
        description:animal.data.bio,
        image:animal.data.imageURL
      })
    }))
  }


}
