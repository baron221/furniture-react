import React from "react";
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch, useLocation } from 'react-router-dom'
import { VisitOtherPage } from "./VisitOtherPage";
import { VisitMyPage } from "./VisitMyPage";
import "../../../css/my_page.css";


function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function LoginPage(props: any) {
const {verifiedMemberData}= props;
    let shop = useRouteMatch();
    const query = useQuery();



    return (
        <div className="restaurant_page">
            <Switch>
                <Route path={`${shop.path}/other`}>
                    <VisitOtherPage verifiedMemberData={verifiedMemberData} />

                </Route>
                <Route path={`${shop.path}`}>
                    <VisitMyPage verifiedMemberData={verifiedMemberData} />
                </Route>
            </Switch>
        </div>
    );
}