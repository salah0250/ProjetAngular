export class Assignment {
    _id?:string;
    id!:number;
    auteurs!: string;
    nom!: string;
    matiere!: { non_matiere: string } |{ professeur: string }|{ image : string}|  string | null; // Permettre une chaîne ou un objet
    dateDeRendu!: Date;
    Notes!: number;
    Remarque!: string;
    rendu!: boolean;
    
}
