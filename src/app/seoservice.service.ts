import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoserviceService {

  constructor(private meta: Meta, private titleservice: Title) {

  }

  generateTags(tags: any) {
    tags = {
      title: "Angular-SSR",
      description: "MY SEO friendly Angular Component",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/768px-Angular_full_color_logo.svg.png",
      slug: '',
      ...tags
    }
this.titleservice.setTitle(tags.title)
this.meta.updateTag({name:'twitter:card',content:'summary'});
this.meta.updateTag({name:'twitter:site',content:'@angular/kanishka'});
this.meta.updateTag({name:'twitter:title',content:tags.title});
this.meta.updateTag({name:'twitter:description',content:tags.description});
this.meta.updateTag({name:'twitter:image',content:tags.image});
 

this.meta.updateTag({name:'og:card',content:'article'});
this.meta.updateTag({name:'og:site',content:'AngularFirebase/kanishka'});
this.meta.updateTag({name:'og:title',content:tags.title});
this.meta.updateTag({name:'og:description',content:tags.description});
this.meta.updateTag({name:'og:image',content:tags.image});
this.meta.updateTag({name:'og:url',content:'https://www.linkedin.com/in/kanishka-naik-6b5180191/'});



  }
}
