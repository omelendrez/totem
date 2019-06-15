var SimplePosnetDIApi   = require('simple_transaction_posnet_device_integrator_api');
var eventEmmiter        = require( 'events' ).EventEmitter;

// Emitter
var localEmmiter        = new eventEmmiter();

// States
var stateTypes                          = {};
stateTypes.startApp                     = 1;
stateTypes.getCurrenciesAvailables      = 2;
stateTypes.getPaymentMethodsAvailables  = 3;
stateTypes.sendBuy                      = 4;
stateTypes.confirmTransaction           = 5;
stateTypes.sendReturn                   = 6;
stateTypes.sendBatchClose               = 7;
stateTypes.error                        = 8;
stateTypes.endApp                       = 9;

// Ops
var voidOps     = {};
var buyOps      = {};
var returnOps   = {};


// Operations to do
var operations                          = [];
operations[ operations.length ]         = stateTypes.getCurrenciesAvailables;
operations[ operations.length ]         = stateTypes.getPaymentMethodsAvailables;
operations[ operations.length ]         = stateTypes.sendBuy;
operations[ operations.length ]         = stateTypes.sendBuy;
operations[ operations.length ]         = stateTypes.sendReturn;
operations[ operations.length ]         = stateTypes.sendVoid;
operations[ operations.length ]         = stateTypes.sendBatchClose;
operations[ operations.length ]         = stateTypes.endApp;

// Actual operation
var actualOperation                     = 0;


// Actual state
var actualState                         = stateTypes.startApp;
var mainEventName                       = "mainEvent";

var allApi          = new SimplePosnetDIApi.AllApi();
var financialApi    = new SimplePosnetDIApi.FinancialApi();
var queryApi        = new SimplePosnetDIApi.QueryApi();


function execCommand( api, command, ops, nextState ){
    
    console.log( "[ " + command + " ] - Sending request. Params values: \n" );
    console.log( JSON.stringify( ops, null, 4 ) );
    
    api[ command ]( ops, function( error, data, respose ){
        
        if( error ){
           
            console.log( "[ " + command + " ] - Error found. Description: " + error  );
            
            actualState = stateTypes.error;
            
        } else {
            
            var response = JSON.parse( respose.text );
            console.log( "[ " + command + " ] - Response received. Values: \n"  );
            console.log( JSON.stringify( response, null, 4 ) );
            
            switch( response.ResultCode.toString() ){
                
                case "2080":
                    actualOperation--;
                    actualState = stateTypes.confirmTransaction;
                break;
                
                case "-1":
                    actualState = nextState;
                break;
                
                default:
                    actualState = stateTypes.error;
                break;
                
            }
            
        }         

        waitTime();        
        
    });
    
};

function waitTime(){

    setTimeout( function(){
        localEmmiter.emit( mainEventName );
    }, 8000 );

}

localEmmiter.on( mainEventName, function( error, result ){
    
    switch( actualState ){
    
        case stateTypes.startApp:
        
            console.log( "Initializating the app" );
            actualState = operations[ actualOperation ];
            
            localEmmiter.emit( mainEventName ); 
            
        break;
    
        case stateTypes.getCurrenciesAvailables:
        
            var currenciesOps = { 
              'body': new SimplePosnetDIApi.CurrenciesRequest()
            };
            currenciesOps.body.TransactionRequestType = "Currencies";
            
            actualOperation++;
            execCommand( queryApi, "currencies", currenciesOps, operations[ actualOperation ] );
            
        break;
    
        case stateTypes.getPaymentMethodsAvailables:
        
            var paymentMethodsOps = { 
              'body': new SimplePosnetDIApi.PaymentMethodsRequest()
            };
            paymentMethodsOps.body.TransactionRequestType = "PaymentMethods";
            
            actualOperation++;
            execCommand( queryApi, "paymentMethods", paymentMethodsOps, operations[ actualOperation ] );
        
        break;
    
        case stateTypes.sendBuy:
        
            buyOps = { 
              'body': new SimplePosnetDIApi.BuyRequest()
            };

            buyOps.body.TransactionRequestType            = "Buy";
            buyOps.body.TransactionResolutionMode         = "Online";
            buyOps.body.TransactionCurrencyCode           = "32";
            buyOps.body.TransactionAmount                 = "10.52";
            buyOps.body.TransactionInstallments           = "2";
            buyOps.body.ReceiptNumber                     = "212457895";
            
            execCommand( financialApi, "doBuy", buyOps, stateTypes.confirmTransaction );
        
        break;
        
        case stateTypes.sendReturn:
        
            returnOps = { 
              'body': new SimplePosnetDIApi.ReturnRequest()
            };

            returnOps.body.TransactionRequestType            = "Return";
            returnOps.body.TransactionResolutionMode         = "Online";
            returnOps.body.TransactionCurrencyCode           = "32";
            returnOps.body.TransactionAmount                 = "10.52";
            returnOps.body.TransactionInstallments           = "1";
            returnOps.body.OriginalTicketNumber              = "124";
            returnOps.body.OriginalDate                      = "2017/09/15";
            returnOps.body.ReceiptNumber                     = "212457896";
            
            execCommand( financialApi, "doReturn", returnOps, stateTypes.confirmTransaction );
        
        break;
        
        case stateTypes.sendVoid:
        
            voidOps = { 
              'body': new SimplePosnetDIApi.VoidRequest()
            };

            voidOps.body.TransactionRequestType            = "Void";
            voidOps.body.TransactionResolutionMode         = "Offline";
            voidOps.body.TransactionCurrencyCode           = "32";
            voidOps.body.TransactionAmount                 = "10.52";
            voidOps.body.TransactionInstallments           = "1";
            voidOps.body.OriginalTicketNumber              = "124";
            voidOps.body.OriginalDate                      = "2017/09/15";
            voidOps.body.ReceiptNumber                     = "212457897";
            
            execCommand( financialApi, "doVoid", voidOps, stateTypes.confirmTransaction );
        
        break;
        
        case stateTypes.sendBatchClose:
        
            var batchCloseOps = { 
              'body': new SimplePosnetDIApi.BatchCloseRequest()
            };
            batchCloseOps.body.TransactionRequestType = "BatchClose";
            
            execCommand( financialApi, "doBatchClose",  batchCloseOps, stateTypes.confirmTransaction );
        
        break;
        
        case stateTypes.confirmTransaction:
        
            var confirmTransactionOps = { 
              'body': new SimplePosnetDIApi.ConfirmTransactionRequest()
            };
            confirmTransactionOps.body.TransactionRequestType = "ConfirmTransaction";
            
            actualOperation++;
            execCommand( financialApi, "confirmTransaction", confirmTransactionOps, operations[ actualOperation ] );
        
        break;
        
        case stateTypes.endApp:
            process.exit( 1 );
        break;
    
        case stateTypes.error:
            console.log( "Closing the app" );
            process.exit( 1 );
        break;
    
        case stateTypes.sendVoid:
        break;
    
    }
    
});


localEmmiter.emit( mainEventName ); 
