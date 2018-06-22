import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
import { SignIn, Register } from './Auth';
import AuthService from '../services/Auth';
import { ErrorPage } from './Error';
import { Contacts } from './Contacts';
import { ContactForm } from './ContactForm';
import { Header } from './Header';
import { Decks } from './Decks';
import { DeckView } from './DeckView';

export class RoutePaths {
    public static Contacts: string = "/contacts";
    public static ContactEdit: string = "/contacts/edit/:id";
    public static ContactNew: string = "/contacts/new";
    public static SignIn: string = "/";
    public static Register: string = "/register/";
    public static Decks: string = "/decks";
    public static DeckView: string = "/decks/:id";
}

export default class Routes extends React.Component<any, any> {
    render() {
        return <Switch>
            <Route exact path={RoutePaths.SignIn} component={SignIn} />
            <Route path={RoutePaths.Register} component={Register} />
            <DefaultLayout exact path={RoutePaths.Contacts} component={Contacts} />
            <DefaultLayout exact path={RoutePaths.Decks} component={Decks} />
            <DeckLayout exact path={RoutePaths.DeckView} component={DeckView} />
            <DefaultLayout path={RoutePaths.ContactNew} component={ContactForm} />
            <DefaultLayout path={RoutePaths.ContactEdit} component={ContactForm} />
            <Route path='/error/:code?' component={ErrorPage} />
        </Switch>
    }
}

const DefaultLayout = ({ component: Component, ...rest }: { component: any, path: string, exact?: boolean }) => (
    <Route {...rest} render={props => (
        AuthService.isSignedInIn() ? (
            <div>
                <Header {...props} />
                <div className="container">
                    <Component {...props} />
                </div>
            </div>
        ) : (
                <Redirect to={{
                    pathname: RoutePaths.SignIn,
                    state: { from: props.location }
                }} />
            )
    )} />
);

const DeckLayout = ({ component: Component, ...rest }: { component: any, path: string, exact?: boolean }) => (
    <Route {...rest} render={props => (
        AuthService.isSignedInIn() ? (
            <div>
                <Header {...props} />
                <div className="container">
                    <Component {...props} />
                </div>
            </div>
        ) : (
                <Redirect to={{
                    pathname: RoutePaths.SignIn,
                    state: { from: props.location }
                }} />
            )
    )} />
);

