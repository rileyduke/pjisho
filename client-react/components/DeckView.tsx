import * as React from "react";
import { Link, Redirect } from 'react-router-dom';
import { RoutePaths } from './Routes';
import DeckService, { IDeck } from '../services/Decks';
import { RouteComponentProps } from "react-router";

let deckService = new DeckService();

export class DeckView extends React.Component<RouteComponentProps<any>, any> {
    refs: {
        query: HTMLInputElement;
    };

    state = {
        deck:{} as IDeck
    };

    componentDidMount() {
        if (this.props.match.path == RoutePaths.DeckView) {
            deckService.fetch(this.props.match.params.id).then((response) => {
                this.setState({ deck: response.content });
            });
        }
    }

    render() {
        return <div>
            <h1>{this.state.deck.name}</h1>
        </div>
    };
}
