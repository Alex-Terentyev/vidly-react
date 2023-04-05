import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init(){
    // Sentry.init({
    //     dsn: "https://e4268cd8488c4ba888584ea7c9834b6c@o4504724535312384.ingest.sentry.io/4504724540489728",
    //     integrations: [new BrowserTracing()],
    //     release: 0.1,
    //     tracesSampleRate: 1.0,
    //     });
}

function log(error){
    // Sentry.withScope(scope => {
    //     scope.setExtra('debug', false);
    //     Sentry.captureException(error);
    //   });

    console.error('unexpected error occured');
}


export default {
    init,
    log
}

// import Raven from 'raven-js';

// function init(){
//     Raven.config("https://e4268cd8488c4ba888584ea7c9834b6c@o4504724535312384.ingest.sentry.io/4504724540489728",
//         {
//             release: '0-0-1',
//             environment:'dev-test'
//         }).install();
// }

// function log(error){
//     Raven.captureException(error);
// }