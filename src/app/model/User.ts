export class User {
    private id: number;
    private username: string;
    private password: string | Int32Array;
    private token: string;
    private vote: number;

    constructor(username: string, password: string | Int32Array, vote?: number, token?: string, id?: number){
        this.id = id!;
        this.username = username;
        this.password = password;
        this.token = token!;
        this.vote = vote!;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number) {
        this.id = id!;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string) {
        this.username = username;
    }

    public getPassword(): string | Int32Array {
        return this.password;
    }

    public setPassword(password: string | Int32Array) {
        this.password = password;
    }

    public getVote(): number {
        return this.vote;
    }

    public setVote(vote: number) {
        this.vote = vote;
    }

    public getToken(): string {
        return this.token;
    }

    public setToken(token: string) {
        this.token = token;
    }

    public static fromStorage(myStorage: Storage): User | null {
        const obj = JSON.parse(myStorage.getItem('user')!);
        if(obj){
            return new User(obj.username, "", obj.vote, obj.token, obj.id);
        }
        return null;
    }

}