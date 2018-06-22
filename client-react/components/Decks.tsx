import * as React from "react";
import { Link, Redirect } from 'react-router-dom';
import { RoutePaths } from './Routes';
import DeckService, { IDeck } from '../services/Decks';
import { RouteComponentProps } from "react-router";

let deckService = new DeckService();

export class Decks extends React.Component<RouteComponentProps<any>, any> {
    refs: {
        query: HTMLInputElement;
    };

    state = {
        decks: [] as Array<IDeck>,
        editDeck: null as Object,
        isAddMode: false as boolean,
        searchQuery: '' as string
    };

    componentDidMount() {
        this.showAll();
    }

    showAll() {
        deckService.fetchAll().then((response) => {
            this.setState({ searchQuery: '', decks: response.content });
        });
    }

    handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ searchQuery: event.target.value });
    }

    handleSeachSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if(!this.state.searchQuery){
            this.showAll();
            return;
        }

        deckService.search(this.state.searchQuery).then((response) => {
            this.setState({ decks: response.content });
        });
    }

    delete(deck: IDeck) {
        deckService.delete(deck.id).then((response) => {
            let updatedDecks = this.state.decks;
            updatedDecks.splice(updatedDecks.indexOf(deck), 1);
            this.setState({ decks: updatedDecks });
        });
    }

    render() {
        return <div>
            <h1>Decks</h1>
            <form className="form-inline my-2 my-lg-0" onSubmit={(e) => this.handleSeachSubmit(e)}>
                <input className="form-control form-control form-control-sm" type="text" value={this.state.searchQuery} onChange={(e) => this.handleSearchQueryChange(e)} placeholder="Search" />
                <button className="btn btn-outline-success btn-sm" type="submit">Search</button>&nbsp;
            </form>
            {this.state.searchQuery && this.state.decks && this.state.decks.length == 0 &&
                <p>No results!</p>
            }
            {this.state.decks && this.state.decks.length > 0 &&
                <div>
                    {this.state.decks.map((deck, index) =>
                        <div key={deck.id}>
                            {deck.name}
                        </div>
                    )}
                </div>
            }
            {this.state.searchQuery &&
                <button type="button" className="btn btn-primary" onClick={(e) => this.showAll()}>clear search</button>
            }
            {/* <Link className="btn btn-success" to={RoutePaths.DeckNew}>add</Link> */}

        </div>
    };
}
