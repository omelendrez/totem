/*=============================================================================
**  EPSON_FISCAL_INTERFACE.H                              Epson Latin America
**=============================================================================
**  High level of exported functions from DLL
**===========================================================================*/

#ifndef _EPSON_FISCAL_INTERFACE_H_
#define _EPSON_FISCAL_INTERFACE_H_


/*-----------------------------------------------------------------------------
Defines Area
-----------------------------------------------------------------------------*/
#ifdef __WINDOWS__
  #ifdef _USRDLL
    #define DLL_EXPORT_IMPORT __declspec(dllexport)
  #else
    #define DLL_EXPORT_IMPORT 
  #endif
  #define DLL_STD_CALL  __stdcall
#else
  #define DLL_EXPORT_IMPORT
  #define DLL_STD_CALL
#endif


/*-----------------------------------------------------------------------------
DLL Exported Function Prototypes
-----------------------------------------------------------------------------*/

/* Connection */
DLL_EXPORT_IMPORT int DLL_STD_CALL ConfigurarVelocidad( int velocidad );

DLL_EXPORT_IMPORT int DLL_STD_CALL ConfigurarPuerto( const char *puerto );

DLL_EXPORT_IMPORT int DLL_STD_CALL Conectar( void );

DLL_EXPORT_IMPORT int DLL_STD_CALL Desconectar( void );

DLL_EXPORT_IMPORT int DLL_STD_CALL Cancelar( void );


/* Log */
DLL_EXPORT_IMPORT int DLL_STD_CALL ComenzarLog( bool incluir_tramas );

DLL_EXPORT_IMPORT int DLL_STD_CALL DetenerLog( void );

DLL_EXPORT_IMPORT int DLL_STD_CALL PausarLog( void );

DLL_EXPORT_IMPORT int DLL_STD_CALL ReanudarLog( void );


/* Queries */
DLL_EXPORT_IMPORT int DLL_STD_CALL ConsultarUltimoError( void );

DLL_EXPORT_IMPORT int DLL_STD_CALL ConsultarDescripcionDeError( int numero_de_error, char *respuesta_descripcion, int respuesta_descripcion_largo_maximo );

DLL_EXPORT_IMPORT int DLL_STD_CALL ConsultarEstadoDeConexion( void );   /* Obsolete, and undocumented. */

DLL_EXPORT_IMPORT int DLL_STD_CALL ConsultarVersionDll( char *respuesta_descripcion, int respuesta_descripcion_largo_maximo, int *respuesta_mayor, int *respuesta_menor );

DLL_EXPORT_IMPORT int DLL_STD_CALL ConsultarVersionEquipo( char *respuesta_descripcion, int respuesta_descripcion_largo_maximo, int *respuesta_mayor, int *respuesta_menor );

DLL_EXPORT_IMPORT int DLL_STD_CALL ConsultarNumeroPuntoDeVenta( char *respuesta, int respuesta_largo_maximo );

DLL_EXPORT_IMPORT int DLL_STD_CALL ConsultarTipoResponsabilidadAnteElIVA( char *respuesta, int respuesta_largo_maximo );

DLL_EXPORT_IMPORT int DLL_STD_CALL ConsultarTipoHabilitacion( char *respuesta, int respuesta_largo_maximo );

DLL_EXPORT_IMPORT int DLL_STD_CALL ConsultarNumeroComprobanteUltimo( const char *tipo_de_comprobante, char *respuesta, int respuesta_largo_maximo );

DLL_EXPORT_IMPORT int DLL_STD_CALL ConsultarNumeroComprobanteActual( char *respuesta, int respuesta_largo_maximo );

DLL_EXPORT_IMPORT int DLL_STD_CALL ConsultarTipoComprobanteActual( char *respuesta, int respuesta_largo_maximo );

DLL_EXPORT_IMPORT int DLL_STD_CALL ConsultarSubTotalBrutoComprobanteActual( char *respuesta, int respuesta_largo_maximo );

DLL_EXPORT_IMPORT int DLL_STD_CALL ConsultarSubTotalNetoComprobanteActual( char *respuesta, int respuesta_largo_maximo );

DLL_EXPORT_IMPORT int DLL_STD_CALL ConsultarEstado( int id_consulta, int *respuesta );


/* Set/Get Settings */
DLL_EXPORT_IMPORT int DLL_STD_CALL EstablecerEncabezado( int numero_encabezado, const char *descripcion );
DLL_EXPORT_IMPORT int DLL_STD_CALL ConsultarEncabezado( int numero_encabezado, char *respuesta, int respuesta_largo_maximo );

DLL_EXPORT_IMPORT int DLL_STD_CALL EstablecerCola( int numero_cola, const char *descripcion );
DLL_EXPORT_IMPORT int DLL_STD_CALL ConsultarCola( int numero_cola, char *respuesta, int respuesta_largo_maximo );

DLL_EXPORT_IMPORT int DLL_STD_CALL EstablecerFechaHora( const char *fecha_hora );
DLL_EXPORT_IMPORT int DLL_STD_CALL ConsultarFechaHora( char *respuesta, int respuesta_largo_maximo );


/* Audit/Download */
DLL_EXPORT_IMPORT int DLL_STD_CALL ImprimirAuditoria( int id_modificador, const char *desde, const char *hasta );

DLL_EXPORT_IMPORT int DLL_STD_CALL Descargar( const char *desde, const char *hasta, const char *directorio_de_descarga );
DLL_EXPORT_IMPORT int DLL_STD_CALL DescargarPeriodoPendiente( const char *directorio_de_descarga );
DLL_EXPORT_IMPORT int DLL_STD_CALL ConfimarDescarga( const char *hasta );
DLL_EXPORT_IMPORT int DLL_STD_CALL ConsultarFechaPrimerJornadaPendiente( char *respuesta_fecha_pendiente, int respuesta_fecha_pendiente_largo_maximo );

/* Sales */
DLL_EXPORT_IMPORT int DLL_STD_CALL CargarDatosCliente( const char *nombre_o_razon_social1, const char *nombre_o_razon_social2,
                                                       const char *domicilio1, const char *domicilio2, const char *domicilio3,
                                                       int id_tipo_documento, const char *numero_documento, int id_responsabilidad_iva );

DLL_EXPORT_IMPORT int DLL_STD_CALL CargarComprobanteAsociado( const char *descripcion );

DLL_EXPORT_IMPORT int DLL_STD_CALL AbrirComprobante( int id_tipo_documento );

DLL_EXPORT_IMPORT int DLL_STD_CALL CargarTextoExtra( const char *descripcion );

DLL_EXPORT_IMPORT int DLL_STD_CALL ImprimirItem( int id_modificador, const char *descripcion, const char *cantidad, const char *precio, int id_tasa_iva,
                                                 int ii_id, const char *ii_valor, int id_codigo, const char *codigo, const char *codigo_unidad_matrix,
                                                 int codigo_unidad_medida );

DLL_EXPORT_IMPORT int DLL_STD_CALL ImprimirTextoLibre( const char *descripcion );

DLL_EXPORT_IMPORT int DLL_STD_CALL CargarAjuste( int id_modificador, const char *descripcion, const char *monto,
                                                 int id_tasa_iva, const char *codigo_interno );

DLL_EXPORT_IMPORT int DLL_STD_CALL CargarOtrosTributos( int codigo_otros_tributos, const char *descripcion, const char *monto, int id_tasa_iva );

DLL_EXPORT_IMPORT int DLL_STD_CALL CargarPago( int id_modificador, int codigo_forma_pago, int cantidad_cuotas, const char *monto,
                                               const char *descripcion_de_cupones, const char *descripcion,
                                               const char *descripcion_extra1, const char *descripcion_extra2 );

DLL_EXPORT_IMPORT int DLL_STD_CALL ImprimirSubtotal( void );

DLL_EXPORT_IMPORT int DLL_STD_CALL CerrarComprobante( void );


/* Journal */
DLL_EXPORT_IMPORT int DLL_STD_CALL ImprimirCierreX( void );

DLL_EXPORT_IMPORT int DLL_STD_CALL ImprimirCierreZ( void );


/* User logo */
DLL_EXPORT_IMPORT int DLL_STD_CALL CargarLogo( const char *nombre_de_archivo );
DLL_EXPORT_IMPORT int DLL_STD_CALL EliminarLogo( void );


/* Configuration */
DLL_EXPORT_IMPORT int DLL_STD_CALL ConfigurarRetardoAlEnviarComando( int milisegundos );   /*     *** undocumented ***      */
                                                                                           /*  The value is in miliseconds. */
                                                                                           /*        -1  is disables.       */
                                                                                           /*      1000  is one second.     */

/* Generic (low level extended protocol) */
DLL_EXPORT_IMPORT int DLL_STD_CALL EnviarComando( const char *comando );

DLL_EXPORT_IMPORT int DLL_STD_CALL ObtenerRespuesta( char *buffer_salida, int largo_buffer_salida, int *largo_final_buffer_salida );

DLL_EXPORT_IMPORT int DLL_STD_CALL ObtenerCodigoRetorno( void );

DLL_EXPORT_IMPORT int DLL_STD_CALL ObtenerEstadoFiscal( void );

DLL_EXPORT_IMPORT int DLL_STD_CALL ObtenerEstadoImpresora( void );

DLL_EXPORT_IMPORT int DLL_STD_CALL ObtenerCantidadCamposRespuestaExtendida( void );

DLL_EXPORT_IMPORT int DLL_STD_CALL ObtenerRespuestaExtendida( int numero_campo, char *buffer_salida, int largo_buffer_salida, int *largo_final_buffer_salida );



#endif /* _EPSON_FISCAL_INTERFACE_H_ */

