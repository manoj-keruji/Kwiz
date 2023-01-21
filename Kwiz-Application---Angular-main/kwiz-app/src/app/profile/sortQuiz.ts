export class Sorted{
  sortByCategory( a: any, b:any ) {
    if ( a.quiz.category < b.quiz.category ){
      return 1;
    }
    if (  a.quiz.category > b.quiz.category  ){
      return -1;
    }
    return 0;
  }
  sortByDateAcc( a: any, b:any ) {
    if ( a.user.date < b.user.date ){
      return 1;
    }
    if (  a.user.date > b.user.date  ){
      return -1;
    }
    return 0;
  }
  sortByDateDec( a: any, b:any ) {
    if ( a.user.date < b.user.date ){
      return -1;
    }
    if (  a.user.date > b.user.date  ){
      return 1;
    }
    return 0;
  }

  sortByLevel( a: any, b:any ) {
    if ( a.quiz.level < b.quiz.level ){
      return 1;
    }
    if (  a.quiz.level > b.quiz.level  ){
      return -1;
    }
    return 0;
  }

  sortByScore( a: any, b:any ) {
    if ( a.user.score < b.user.score ){
      return -1;
    }
    if (  a.user.score > b.user.score  ){
      return 1;
    }
    return 0;
  }

  sortByName( a: any, b:any ) {
    if ( a.quiz.name < b.quiz.name ){
      return 1;
    }
    if (  a.quiz.name > b.quiz.name  ){
      return -1;
    }
    return 0;
  }

}