import React, { useState, useEffect, useContext } from 'react';
import Participants from './Participants.jsx';
import { ParticipantEditor } from './ParticipantEditor.jsx';

const navigationDefault = {
    allowedRoutes: ["participants", "edit-participants"],
    route: "participants",
    navigationStack: [],
    navigationData: null,
    navigationListeners: [],
    navigate(newRoute, navigationData) {
        if (this.allowedRoutes.indexOf(newRoute) > -1) {
            this.route = newRoute;
            this.navigationData = navigationData;
            this.navigationStack = [...this.navigationStack, newRoute];
            this.dispatchNavigationUpdate();
        } else {
            throw "Route now found";
        }
    },
    subscribeNavigationUpdate(onNavigationChange) {
        if (this.navigationListeners.indexOf(onNavigationChange) > -1) {
            return;
        }
        this.navigationListeners = [...this.navigationListeners, onNavigationChange];
        return () => {
            this.navigationListeners.splice(this.navigationListeners.indexOf(onNavigationChange), 1);
        }
    },
    dispatchNavigationUpdate() {
        this.navigationListeners.forEach(listener => {
            listener(this);
        })
    }
}

export const AppNavigationContext = React.createContext(navigationDefault);

const App = () => {
    const [navigation, setNavigation] = useState(navigationDefault);
    useEffect(() => {
        const unsubscribe = navigation.subscribeNavigationUpdate((newNavigation) => {
            setNavigation({...newNavigation});
        });
        setNavigation({...navigation});
        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <div>
            <AppNavigationContext.Provider value={navigation}>
                <h2>
                    Tournament Bracket
                </h2>
                {
                    navigation.route === "participants" ? (
                        <Participants />
                    ) : null
                }
                {
                    navigation.route === "edit-participants" ? (
                        <ParticipantEditor participant={navigation.navigationData} />
                    ) : null
                }
            </AppNavigationContext.Provider>
        </div>
    );
};

export default App;