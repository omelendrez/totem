/**
 * Simple Transaction POSNET Device Integrator API
 * Servicio Simple de Integración con el componente llamado PosnetDeviceIntegrator.<br /><br /> Contrato especificado según especificaciones https://www.openapis.org/ y https://swagger.io/.><br /><br />  En el site https://editor.swagger.io/ se dispone de un  Viewer, Editor y  Generar de Código ( SDK ) para varios lenguajes de programación; incluyendo JAVA, C#, C++, Perl, Node.js, GO, PHP, Ruby y otros.<br/><br/> Para <b>ver</b> la documentación o <b>generar</b> código de la librería cliente o SDK  se deberá seleccionar en el menú horizontal  la opción <b>File</b>, en el menú vertical que se depliega la opción <b>Import File</b> y luego se deberá seleccionar el archivo del contrato deseado, ya sea  extensión <b>.json</b> o <b>.yaml</b>. <br/><br/>Los clientes generados contienen, adicionalmente al código,  la documentación de uso del mismo en <b>README.md</b>, como también en el subdirectorio <b>docs</b> toda la documentación del API o servicio y sus operaciones, con el detalle de los  campos o elementos y su dominio.<br /><br />  A diferencia de con el <b>Servicio Avanzado</b> se puede realizar una transacción simplemente invocando entre una y dos <b>operaciones</b>.<br/><br/> Por ejemplo, para realizar una autorización de <b>Compra</b> se deberá invocar la operación <b>Buy</b>.<br /> Todas las operaciones financieras ( Categoría <b>Financial</b> ) deben ser confirmadas con la operación <b>ConfirmTransaction</b> ( a excepción de la misma ). Adicionalmente, si no se llegase a obtener respuesta en las operaciones de dicha categoria, se podrá obtener el resultado de la última operación realizada con la operación <b>GetLastTransaction</b>. <br /> <br /> En esta modalidad de integración, los servicios finalizarán si no se puede comunicar con la terminal, si la terminal retorna por cualquier condición o si pasaron mas de <b>300</b> segundos desde que se invocó el comando.<br /><br /> Por el momento es mandatorio el envío del elemento <b>TransactionRequestType</b> con el valor de la <b>operación</b> a realizar si la misma no se especifica en el <b>URL</b> o si se utiliza <b>TCP</b>.  Se soportan otros formatos de codificación además de <b>application/json</b>, ya sea para  la codificación de  los  requerimientos como la codificación  de la respuesta. Los nuevos formatos son <b>application/xml</b> y  <b>application/x-www-form-urlencoded</b>. El formato de codificación de los requerimientos enviados y el de las respuestas  a recibir se especifican en el <b>Header HTTP</b> con los elementos <b>Accept</b> y <b>Content-Type</b>, pudiéndose especificar formatos diferentes para los requerimientos ( <b>Content-Type</b> )  y las respuestas ( <b>Accept</b> ).<br/> Son soportados requerimientos utilizando el metodo HTTP <b>GET</b> en lugar de <b>POST</b>.  En este caso, todos los elementos que en el caso de usar POST se envían en el Body de la  transacción <b>HTTP</b> se enviarán en el <b>Query String</b> del <b>URL</b> del requerimiento.<br/><br/> <b>Ejemplo:</b><br/> http://localhost::8280/PosnetDeviceIntegrator/2.2.0/Financial/Buy?TransactionCurrencyCode=032&TransactionAmount=1.00&ReceiptNumber=1234567890<br/><br/> En caso de no especificarse en el Header HTTP  <b>Accept</b>, el formato de codificación para las respuestas será <b>JSON</b> para las operaciones realizadas utilizando <b>HTTP GET</b>, o el mismo que la codificación especificada para los requerimientos  ( <b>Content-Type</b> ) si se utilizó <b>HTTP POST</b>. <br/> <b><u>Características soportadas desde la versión 2.4.0</u></b><br/> Se da soporte a los dispositivos Clover Flex y Mini ( <b>http://www.la.clover.com</b> ) . En esta version solamente son soportados los Comandos <b>Buy</b>, <b>Void</b> y <b>Return</b>,<br/><br/>Los campos adicionales que seran obtenidos en una respuesta proveniente de un dispotivo Clover seran <b>PaymentID</b>, <b>OrderID</b>, <b>PaymentMethodID</b>, <b>TransactionTipAmount</b>, <b>TransactionTaxAmount</b>, <b>ExternalTransactionID</b>, <b>LastFourDigits</b>, <b>FirstSixDigits</b> y <b>CardHolderName</b>. A su vez, seran requeridos dos campos adicionales para poder realizar un Void y/o un Return, llamados <b>OrigPaymentID</b> y <b>OrigOrderID</b>. Estos valores son obtenidos en la respuesta de la operacion original que se quiere anular o devolver.<br/><br/>Se disponibiliza la posibilidad de elegir el o los tickets a imprimir en la terminal. A traves del elemento <b>TicketsToPrint</b> se podra indicar si se desea imprimir el ticket del cliente (<b>Customer</b>), del comercio(<b>Merchant</b>) o ambos (<b>Customer</b> y <b>Merchant</b>). <br/><br/> <b><u>Características soportadas desde la versión 2.0.0</u></b><br/> Se disponibiliza una nueva funcionalidad de <b>lectura y reconocimiento previo</b> del medio de pago a utilizar, habilitando la posibilidad de aplicar <b>descuentos y/o promociones</b>. Asimismo, será posible no continuar con la transacción, cancelando la lectura. Este escenario podría suceder si el comercio decidiera no operar con esa tarjeta. Este circuito se compone de dos nuevos tipos de transacciones, <b>GetCard</b> y <b>CancelGetCard</b>. <br/>Es soportado el <b>protocolo TCP para la interacción con el aplicativo</b>. Mediante la configuración previa en el archivo INI correspondiente, el usuario podrá indicar el tipo de codificación del cuerpo de los requerimientos. Son soportadas las mismas codificaciones utilizadas para HTTP. <br/>El funcionamiento de <b>ConfirmTransaction</b> es modificado por completo. De ahora en más, <b>el DeviceIntegrator contestará automáticamente como procesado exitosamente</b>. A partir de allí, se dispondrá a consultar el estado del dispositivo. Una vez que se informa que esta disponible para procesar nuevas operaciones enviaremos la petición de confirmación. De esta forma <b>se reduce el tiempo necesario para realizar una operación financiera</b>, gracias a que el punto de venta puede continuar su operatoria mientras el dispositivo imprime el ticket, se ingresa la firma, el DNI, etc.  <br/>El campo <b>CardType</b> contempla dos nuevos valores,  <b>Tax Free(T)</b> y <b>Unknown(U)</b>. De esta forma se cubren todos los posibles casos con los que el dispositivo podría tener que operar. <br/><br/><br/> &copy; 2017-2019 First Data Corporation. All rights reserved.<br /> The FIRST DATA name, logo and related trademarks and service marks, owned<br /> by First Data Corporation, are registered and/or used in the<br /> United States and many foreign countries. All other trademarks,<br /> service marks and trade names referenced in this site are the property<br /> of their respective owners.<br /> <br /> <br /> ANY USE, COPYING OR REPRODUCTION OF THE TRADEMARKS, LOGOS, INFORMATION,<br />  IMAGES OR DESIGNS CONTAINED IN THIS SITE IS STRICTLY<br />  PROHIBITED WITHOUT THE PRIOR WRITTEN PERMISSION OF FIRST DATA<br /> CORPORATION.<br /> <br />  
 *
 * OpenAPI spec version: 2.2.0
 * Contact: implementaciones@posnet.com.ar
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.4
 *
 * Do not edit the class manually.
 *
 */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/BatchCloseRequest', 'model/BatchCloseResponse', 'model/BatchCloseResponseHosts', 'model/BuyRequest', 'model/BuyResponse', 'model/BuyWithCashbackRequest', 'model/BuyWithCashbackResponse', 'model/CancelGetCardRequest', 'model/CancelGetCardResponse', 'model/ConfirmTransactionRequest', 'model/ConfirmTransactionResponse', 'model/CtlsBuyRequest', 'model/CtlsBuyResponse', 'model/CtlsReturnRequest', 'model/CtlsReturnResponse', 'model/CtlsVoidRequest', 'model/CtlsVoidResponse', 'model/CurrenciesRequest', 'model/CurrenciesResponse', 'model/CurrenciesResponseCurrencies', 'model/GetCardRequest', 'model/GetCardResponse', 'model/GetLastTransactionRequest', 'model/GetLastTransactionResponse', 'model/GetLastTransactionResponseHosts', 'model/PaymentMethodsRequest', 'model/PaymentMethodsResponse', 'model/PaymentMethodsResponsePaymentMethods', 'model/ReturnRequest', 'model/ReturnResponse', 'model/VoidRequest', 'model/VoidResponse', 'api/AllApi', 'api/FinancialApi', 'api/QueryApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/BatchCloseRequest'), require('./model/BatchCloseResponse'), require('./model/BatchCloseResponseHosts'), require('./model/BuyRequest'), require('./model/BuyResponse'), require('./model/BuyWithCashbackRequest'), require('./model/BuyWithCashbackResponse'), require('./model/CancelGetCardRequest'), require('./model/CancelGetCardResponse'), require('./model/ConfirmTransactionRequest'), require('./model/ConfirmTransactionResponse'), require('./model/CtlsBuyRequest'), require('./model/CtlsBuyResponse'), require('./model/CtlsReturnRequest'), require('./model/CtlsReturnResponse'), require('./model/CtlsVoidRequest'), require('./model/CtlsVoidResponse'), require('./model/CurrenciesRequest'), require('./model/CurrenciesResponse'), require('./model/CurrenciesResponseCurrencies'), require('./model/GetCardRequest'), require('./model/GetCardResponse'), require('./model/GetLastTransactionRequest'), require('./model/GetLastTransactionResponse'), require('./model/GetLastTransactionResponseHosts'), require('./model/PaymentMethodsRequest'), require('./model/PaymentMethodsResponse'), require('./model/PaymentMethodsResponsePaymentMethods'), require('./model/ReturnRequest'), require('./model/ReturnResponse'), require('./model/VoidRequest'), require('./model/VoidResponse'), require('./api/AllApi'), require('./api/FinancialApi'), require('./api/QueryApi'));
  }
}(function(ApiClient, BatchCloseRequest, BatchCloseResponse, BatchCloseResponseHosts, BuyRequest, BuyResponse, BuyWithCashbackRequest, BuyWithCashbackResponse, CancelGetCardRequest, CancelGetCardResponse, ConfirmTransactionRequest, ConfirmTransactionResponse, CtlsBuyRequest, CtlsBuyResponse, CtlsReturnRequest, CtlsReturnResponse, CtlsVoidRequest, CtlsVoidResponse, CurrenciesRequest, CurrenciesResponse, CurrenciesResponseCurrencies, GetCardRequest, GetCardResponse, GetLastTransactionRequest, GetLastTransactionResponse, GetLastTransactionResponseHosts, PaymentMethodsRequest, PaymentMethodsResponse, PaymentMethodsResponsePaymentMethods, ReturnRequest, ReturnResponse, VoidRequest, VoidResponse, AllApi, FinancialApi, QueryApi) {
  'use strict';

  /**
   * Servicio_Simple_de_Integracin_con_el_componente_llamado_PosnetDeviceIntegrator_br_br__Contrato_especificado_segn_especificaciones_httpswww_openapis_org_y_httpsswagger_io_br_br___En_el_site_httpseditor_swagger_io_se_dispone_de_un__Viewer_Editor_y__Generar_de_Cdigo___SDK__para_varios_lenguajes_de_programacin_incluyendo_JAVA_C_C_Perl_Node_js_GO_PHP_Ruby_y_otros_brbr_Para_bverb_la_documentacin_o_bgenerarb_cdigo_de_la_librera_cliente_o_SDK__se_deber_seleccionar_en_el_men_horizontal__la_opcin_bFileb_en_el_men_vertical_que_se_depliega_la_opcin_bImport_Fileb_y_luego_se_deber_seleccionar_el_archivo_del_contrato_deseado_ya_sea__extensin_b_jsonb_o_b_yamlb__brbrLos_clientes_generados_contienen_adicionalmente_al_cdigo__la_documentacin_de_uso_del_mismo_en_bREADME_mdb_como_tambin_en_el_subdirectorio_bdocsb_toda_la_documentacin_del_API_o_servicio_y_sus_operaciones_con_el_detalle_de_los__campos_o_elementos_y_su_dominio_br_br___A_diferencia_de_con_el_bServicio_Avanzadob_se_puede_realizar_una_transaccin_simplemente_invocando_entre_una_y_dos_boperacionesb_brbr_Por_ejemplo_para_realizar_una_autorizacin_de_bComprab_se_deber_invocar_la_operacin_bBuyb_br_Todas_las_operaciones_financieras___Categora_bFinancialb__deben_ser_confirmadas_con_la_operacin_bConfirmTransactionb___a_excepcin_de_la_misma___Adicionalmente_si_no_se_llegase_a_obtener_respuesta_en_las_operaciones_de_dicha_categoria_se_podr_obtener_el_resultado_de_la_ltima_operacin_realizada_con_la_operacin_bGetLastTransactionb__br__br__En_esta_modalidad_de_integracin_los_servicios_finalizarn_si_no_se_puede_comunicar_con_la_terminal_si_la_terminal_retorna_por_cualquier_condicin_o_si_pasaron_mas_de_b300b_segundos_desde_que_se_invoc_el_comando_br_br__Por_el_momento_es_mandatorio_el_envo_del_elemento_bTransactionRequestTypeb_con_el_valor_de_la_boperacinb_a_realizar_si_la_misma_no_se_especifica_en_el_bURLb_o_si_se_utiliza_bTCPb_Se_soportan_otros_formatos_de_codificacin_adems_de_bapplicationjsonb_ya_sea_para__la_codificacin_de__los__requerimientos_como_la_codificacin__de_la_respuesta__Los_nuevos_formatos_son_bapplicationxmlb_y__bapplicationx_www_form_urlencodedb__El_formato_de_codificacin_de_los_requerimientos_enviados_y_el_de_las_respuestas__a_recibir_se_especifican_en_el_bHeader_HTTPb_con_los_elementos_bAcceptb_y_bContent_Typeb_pudindose_especificar_formatos_diferentes_para_los_requerimientos___bContent_Typeb___y_las_respuestas___bAcceptb__brSon_soportados_requerimientos_utilizando_el_metodo_HTTP_bGETb_en_lugar_de_bPOSTb___En_este_caso_todos_los_elementos_que_en_el_caso_de_usar_POST_se_envan_en_el_Body_de_la__transaccin_bHTTPb_se_enviarn_en_el_bQuery_Stringb_del_bURLb_del_requerimiento_brbr_bEjemplobbr_httplocalhost8280PosnetDeviceIntegrator2_2_0FinancialBuyTransactionCurrencyCode032TransactionAmount1_00ReceiptNumber1234567890brbr_En_caso_de_no_especificarse_en_el_Header_HTTP__bAcceptb_el_formato_de_codificacin_para_las_respuestas_ser_bJSONb_para_las_operaciones_realizadas_utilizando_bHTTP_GETb_o_el_mismo_que_la_codificacin_especificada_para_los_requerimientos____bContent_Typeb__si_se_utiliz_bHTTP_POSTb__brbuCaractersticas_soportadas_desde_la_versin_2_4_0ubbr_Se_da_soporte_a_los_dispositivos_Clover_Flex_y_Mini___bhttpwww_la_clover_comb____En_esta_version_solamente_son_soportados_los_Comandos_bBuyb_bVoidb_y_bReturnbbrbrLos_campos_adicionales_que_seran_obtenidos_en_una_respuesta_proveniente_de_un_dispotivo_Clover_seran_bPaymentIDb_bOrderIDb_bPaymentMethodIDb_bTransactionTipAmountb_bTransactionTaxAmountb_bExternalTransactionIDb_bLastFourDigitsb_bFirstSixDigitsb_y_bCardHolderNameb__A_su_vez_seran_requeridos_dos_campos_adicionales_para_poder_realizar_un_Void_yo_un_Return_llamados_bOrigPaymentIDb_y_bOrigOrderIDb__Estos_valores_son_obtenidos_en_la_respuesta_de_la_operacion_original_que_se_quiere_anular_o_devolver_brbrSe_disponibiliza_la_posibilidad_de_elegir_el_o_los_tickets_a_imprimir_en_la_terminal__A_traves_del_elemento_bTicketsToPrintb_se_podra_indicar_si_se_desea_imprimir_el_ticket_del_cliente__bCustomerb_del_comercio_bMerchantb_o_ambos__bCustomerb_y_bMerchantb__brbr_buCaractersticas_soportadas_desde_la_versin_2_0_0ubbr_Se_disponibiliza_una_nueva_funcionalidad_de_blectura_y_reconocimiento_previob_del_medio_de_pago_a_utilizar_habilitando_la_posibilidad_de_aplicar_bdescuentos_yo_promocionesb__Asimismo_ser_posible_no_continuar_con_la_transaccin_cancelando_la_lectura__Este_escenario_podra_suceder_si_el_comercio_decidiera_no_operar_con_esa_tarjeta__Este_circuito_se_compone_de_dos_nuevos_tipos_de_transacciones_bGetCardb_y_bCancelGetCardb_brEs_soportado_el_bprotocolo_TCP_para_la_interaccin_con_el_aplicativob__Mediante_la_configuracin_previa_en_el_archivo_INI_correspondiente_el_usuario_podr_indicar_el_tipo_de_codificacin_del_cuerpo_de_los_requerimientos__Son_soportadas_las_mismas_codificaciones_utilizadas_para_HTTP_brEl_funcionamiento_de_bConfirmTransactionb_es_modificado_por_completo__De_ahora_en_ms_bel_DeviceIntegrator_contestar_automticamente_como_procesado_exitosamenteb__A_partir_de_all_se_dispondr_a_consultar_el_estado_del_dispositivo__Una_vez_que_se_informa_que_esta_disponible_para_procesar_nuevas_operaciones_enviaremos_la_peticin_de_confirmacin__De_esta_forma_bse_reduce_el_tiempo_necesario_para_realizar_una_operacin_financierab_gracias_a_que_el_punto_de_venta_puede_continuar_su_operatoria_mientras_el_dispositivo_imprime_el_ticket_se_ingresa_la_firma_el_DNI_etc__brEl_campo_bCardTypeb_contempla_dos_nuevos_valores__bTax_Free_Tb_y_bUnknown_Ub__De_esta_forma_se_cubren_todos_los_posibles_casos_con_los_que_el_dispositivo_podra_tener_que_operar_brbrbr_copy_2017_2019_First_Data_Corporation__All_rights_reserved_br__The_FIRST_DATA_name_logo_and_related_trademarks_and_service_marks_ownedbr__by_First_Data_Corporation_are_registered_andor_used_in_thebr__United_States_and_many_foreign_countries__All_other_trademarksbr__service_marks_and_trade_names_referenced_in_this_site_are_the_propertybr__of_their_respective_owners_br__br__br__ANY_USE_COPYING_OR_REPRODUCTION_OF_THE_TRADEMARKS_LOGOS_INFORMATIONbr___IMAGES_OR_DESIGNS_CONTAINED_IN_THIS_SITE_IS_STRICTLYbr___PROHIBITED_WITHOUT_THE_PRIOR_WRITTEN_PERMISSION_OF_FIRST_DATAbr__CORPORATION_br__br___.<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var SimpleTransactionPosnetDeviceIntegratorApi = require('index'); // See note below*.
   * var xxxSvc = new SimpleTransactionPosnetDeviceIntegratorApi.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new SimpleTransactionPosnetDeviceIntegratorApi.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
   * and put the application logic within the callback function.</em>
   * </p>
   * <p>
   * A non-AMD browser application (discouraged) might do something like this:
   * <pre>
   * var xxxSvc = new SimpleTransactionPosnetDeviceIntegratorApi.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new SimpleTransactionPosnetDeviceIntegratorApi.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version 2.2.0
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The BatchCloseRequest model constructor.
     * @property {module:model/BatchCloseRequest}
     */
    BatchCloseRequest: BatchCloseRequest,
    /**
     * The BatchCloseResponse model constructor.
     * @property {module:model/BatchCloseResponse}
     */
    BatchCloseResponse: BatchCloseResponse,
    /**
     * The BatchCloseResponseHosts model constructor.
     * @property {module:model/BatchCloseResponseHosts}
     */
    BatchCloseResponseHosts: BatchCloseResponseHosts,
    /**
     * The BuyRequest model constructor.
     * @property {module:model/BuyRequest}
     */
    BuyRequest: BuyRequest,
    /**
     * The BuyResponse model constructor.
     * @property {module:model/BuyResponse}
     */
    BuyResponse: BuyResponse,
    /**
     * The BuyWithCashbackRequest model constructor.
     * @property {module:model/BuyWithCashbackRequest}
     */
    BuyWithCashbackRequest: BuyWithCashbackRequest,
    /**
     * The BuyWithCashbackResponse model constructor.
     * @property {module:model/BuyWithCashbackResponse}
     */
    BuyWithCashbackResponse: BuyWithCashbackResponse,
    /**
     * The CancelGetCardRequest model constructor.
     * @property {module:model/CancelGetCardRequest}
     */
    CancelGetCardRequest: CancelGetCardRequest,
    /**
     * The CancelGetCardResponse model constructor.
     * @property {module:model/CancelGetCardResponse}
     */
    CancelGetCardResponse: CancelGetCardResponse,
    /**
     * The ConfirmTransactionRequest model constructor.
     * @property {module:model/ConfirmTransactionRequest}
     */
    ConfirmTransactionRequest: ConfirmTransactionRequest,
    /**
     * The ConfirmTransactionResponse model constructor.
     * @property {module:model/ConfirmTransactionResponse}
     */
    ConfirmTransactionResponse: ConfirmTransactionResponse,
    /**
     * The CtlsBuyRequest model constructor.
     * @property {module:model/CtlsBuyRequest}
     */
    CtlsBuyRequest: CtlsBuyRequest,
    /**
     * The CtlsBuyResponse model constructor.
     * @property {module:model/CtlsBuyResponse}
     */
    CtlsBuyResponse: CtlsBuyResponse,
    /**
     * The CtlsReturnRequest model constructor.
     * @property {module:model/CtlsReturnRequest}
     */
    CtlsReturnRequest: CtlsReturnRequest,
    /**
     * The CtlsReturnResponse model constructor.
     * @property {module:model/CtlsReturnResponse}
     */
    CtlsReturnResponse: CtlsReturnResponse,
    /**
     * The CtlsVoidRequest model constructor.
     * @property {module:model/CtlsVoidRequest}
     */
    CtlsVoidRequest: CtlsVoidRequest,
    /**
     * The CtlsVoidResponse model constructor.
     * @property {module:model/CtlsVoidResponse}
     */
    CtlsVoidResponse: CtlsVoidResponse,
    /**
     * The CurrenciesRequest model constructor.
     * @property {module:model/CurrenciesRequest}
     */
    CurrenciesRequest: CurrenciesRequest,
    /**
     * The CurrenciesResponse model constructor.
     * @property {module:model/CurrenciesResponse}
     */
    CurrenciesResponse: CurrenciesResponse,
    /**
     * The CurrenciesResponseCurrencies model constructor.
     * @property {module:model/CurrenciesResponseCurrencies}
     */
    CurrenciesResponseCurrencies: CurrenciesResponseCurrencies,
    /**
     * The GetCardRequest model constructor.
     * @property {module:model/GetCardRequest}
     */
    GetCardRequest: GetCardRequest,
    /**
     * The GetCardResponse model constructor.
     * @property {module:model/GetCardResponse}
     */
    GetCardResponse: GetCardResponse,
    /**
     * The GetLastTransactionRequest model constructor.
     * @property {module:model/GetLastTransactionRequest}
     */
    GetLastTransactionRequest: GetLastTransactionRequest,
    /**
     * The GetLastTransactionResponse model constructor.
     * @property {module:model/GetLastTransactionResponse}
     */
    GetLastTransactionResponse: GetLastTransactionResponse,
    /**
     * The GetLastTransactionResponseHosts model constructor.
     * @property {module:model/GetLastTransactionResponseHosts}
     */
    GetLastTransactionResponseHosts: GetLastTransactionResponseHosts,
    /**
     * The PaymentMethodsRequest model constructor.
     * @property {module:model/PaymentMethodsRequest}
     */
    PaymentMethodsRequest: PaymentMethodsRequest,
    /**
     * The PaymentMethodsResponse model constructor.
     * @property {module:model/PaymentMethodsResponse}
     */
    PaymentMethodsResponse: PaymentMethodsResponse,
    /**
     * The PaymentMethodsResponsePaymentMethods model constructor.
     * @property {module:model/PaymentMethodsResponsePaymentMethods}
     */
    PaymentMethodsResponsePaymentMethods: PaymentMethodsResponsePaymentMethods,
    /**
     * The ReturnRequest model constructor.
     * @property {module:model/ReturnRequest}
     */
    ReturnRequest: ReturnRequest,
    /**
     * The ReturnResponse model constructor.
     * @property {module:model/ReturnResponse}
     */
    ReturnResponse: ReturnResponse,
    /**
     * The VoidRequest model constructor.
     * @property {module:model/VoidRequest}
     */
    VoidRequest: VoidRequest,
    /**
     * The VoidResponse model constructor.
     * @property {module:model/VoidResponse}
     */
    VoidResponse: VoidResponse,
    /**
     * The AllApi service constructor.
     * @property {module:api/AllApi}
     */
    AllApi: AllApi,
    /**
     * The FinancialApi service constructor.
     * @property {module:api/FinancialApi}
     */
    FinancialApi: FinancialApi,
    /**
     * The QueryApi service constructor.
     * @property {module:api/QueryApi}
     */
    QueryApi: QueryApi
  };

  return exports;
}));
