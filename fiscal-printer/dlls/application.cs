using System.Threading.Tasks;
using System.Runtime.InteropServices;
using System.Text;
using System.Collections.Generic;
public class Startup
{
    public async Task<object> Invoke(object input)
    {
        var userAction = (IDictionary<string, object>)input;
        string action = (string)userAction["action"];
        var speed = (int)userAction["speed"];
        var port = (string)userAction["port"];
        int code = 0;
        string message = "";
        switch (action)
        {
            case "Connect":
                code = EpsonFiscalInterface.ConfigurarPuerto(port);
                code = EpsonFiscalInterface.ConfigurarVelocidad(speed);
                code = EpsonFiscalInterface.Conectar();
                break;
            case "Disconnect":
                code = EpsonFiscalInterface.Desconectar();
                break;
            case "OpenDocument":
                var docType = (int)userAction["docType"];
                code = EpsonFiscalInterface.ConfigurarPuerto(port);
                code = EpsonFiscalInterface.ConfigurarVelocidad(speed);
                code = EpsonFiscalInterface.Conectar();
                code = EpsonFiscalInterface.AbrirComprobante(docType);
                break;
            case "PrintItem":
                var id_modificador = (int)userAction["id_modificador"];
                StringBuilder descripcion = new StringBuilder((string)userAction["ticket_text"]);
                StringBuilder cantidad = new StringBuilder((string)userAction["quantity"]);
                StringBuilder precio = new StringBuilder((string)userAction["total_price"]);
                var id_tasa_iva = (int)userAction["id_tasa_iva"];
                var ii_id = (int)userAction["ii_id"];
                StringBuilder ii_valor = new StringBuilder((string)userAction["ii_valor"]);
                var id_codigo = (int)userAction["id_codigo"];
                StringBuilder codigo = new StringBuilder((string)userAction["code"]);
                StringBuilder codigo_unidad_matrix = new StringBuilder((string)userAction["codigo_unidad_matrix"]);
                var codigo_unidad_medida = (int)userAction["codigo_unidad_medida"];
                code = EpsonFiscalInterface.ImprimirItem(id_modificador, descripcion, cantidad, precio, id_tasa_iva, ii_id, ii_valor, id_codigo, codigo, codigo_unidad_matrix, codigo_unidad_medida);
                break;
            case "PrintSubtotal":
                code = EpsonFiscalInterface.ImprimirSubtotal();
                break;
            case "CloseDocument":
                code = EpsonFiscalInterface.CerrarComprobante();
                break;
            case "Cancel":
                code = EpsonFiscalInterface.Cancelar();
                break;
            case "PartialClose":
                code = EpsonFiscalInterface.ConfigurarPuerto(port);
                code = EpsonFiscalInterface.ConfigurarVelocidad(speed);
                code = EpsonFiscalInterface.Conectar();
                code = EpsonFiscalInterface.ImprimirCierreX();
                break;
            case "DailyClose":
                code = EpsonFiscalInterface.ConfigurarPuerto(port);
                code = EpsonFiscalInterface.ConfigurarVelocidad(speed);
                code = EpsonFiscalInterface.Conectar();
                code = EpsonFiscalInterface.ImprimirCierreZ();
                break;
            case "ConsultarVersionDll":
                const int MAX_ANSWER_LEN = 200;
                StringBuilder answer = new StringBuilder(MAX_ANSWER_LEN);
                int mayor = 0;
                int menor = 0;
                EpsonFiscalInterface.ConsultarVersionDll(answer, MAX_ANSWER_LEN, ref mayor, ref menor);
                message = "-Descripción: " + answer.ToString() + "  -Mayor: " + mayor.ToString() + "  -Menor: " + menor.ToString();
                break;
            case "GetPrinterStatus":
                code = EpsonFiscalInterface.ObtenerEstadoImpresora();
                break;
            case "GetFiscalStatus":
                code = EpsonFiscalInterface.ObtenerEstadoFiscal();
                break;
            default:
                code = -1;
                message = "Command [" + action + "] does not exist";
                break;
        }
        Result resp = new Result { code = code, message = message };
        return resp;
    }
}

public class Result
{
    public int code { get; set; }
    public string message { get; set; }
}

public class EpsonFiscalInterface
{
    // ConfigurarVelocidad()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int ConfigurarVelocidad(int velocidad);

    // ConfigurarPuerto()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int ConfigurarPuerto(string puerto);

    // Conectar()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int Conectar();

    // Desconectar()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int Desconectar();

    // ConsultarUltimoError()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int ConsultarUltimoError();

    // ConsultarDescripcionDeError
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int ConsultarDescripcionDeError(int nro_error, StringBuilder respuesta, int respuesta_largo_maximo);

    // ConsultarVersionDll()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int ConsultarVersionDll(StringBuilder descripcion, int descripcion_largo_maximo, ref int mayor, ref int menor);

    // AbrirComprobante()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int AbrirComprobante(int id_tipo_documento);

    // ImprimirItem()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int ImprimirItem(int id_modificador, StringBuilder descripcion, StringBuilder cantidad, StringBuilder precio, int id_tasa_iva, int ii_id, StringBuilder ii_valor, int id_codigo, StringBuilder codigo, StringBuilder codigo_unidad_matrix, int codigo_unidad_medida);

    // ImprimirSubtotal()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int ImprimirSubtotal();

    // CerrarComprobante()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int CerrarComprobante();

    // Cancelar()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int Cancelar();

    // ImprimirCierreX()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int ImprimirCierreX();

    // ImprimirCierreZ()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int ImprimirCierreZ();

    // ObtenerEstadoFiscal()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int ObtenerEstadoFiscal();

    // ObtenerEstadoImpresora()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int ObtenerEstadoImpresora();

}
