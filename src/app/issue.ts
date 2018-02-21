export class Issue {
    url: string;
    id: number;
    title: string;
    user: {
        login: string;
        avatar_url: string;
    };
    state: string;
    body: string;
}
