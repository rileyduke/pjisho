import RestUtilities from './RestUtilities';

export interface IDeck {
    id?: number,
    name: string;
    description: string;
}

export default class Decks {
    fetchAll() {
        return RestUtilities.get<Array<IDeck>>('/api/deck');
    }

    fetch(deckId: number) {
        return RestUtilities.get<IDeck>(`/api/deck/${deckId}`);
    }

    search(query: string) {
        return RestUtilities.get<Array<IDeck>>(`/api/deck/search/?q=${query}`);
    }

    update(deck: IDeck) {
        return RestUtilities.put<IDeck>(`/api/deck/${deck.id}`, deck);
    }

    create(deck: IDeck) {
        return RestUtilities.post<IDeck>('/api/deck', deck);
    }

    save(deck: IDeck) {
        if (deck.id) {
            return this.update(deck);
        } else {
            return this.create(deck);
        }
    }

    delete(deckId: number) {
        return RestUtilities.delete(`/api/deck/${deckId}`);
    }
}

