export class Assignment {
    _id?:string;
    id!:number;
    data?:any;
    totalItems?:number;
    matiere!: { non_matiere: string } |{ professeur: string }|{ image : string}| string | null; // Permettre une chaîne ou un objet
    auteurs!: string;
    nom!: string;
    dateDeRendu!: Date;
    Notes!: number;
    Remarque!: string;
    rendu!: boolean;
}