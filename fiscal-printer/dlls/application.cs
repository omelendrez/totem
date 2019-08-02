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
        int code = 0;
        string message = "";
        switch (action)
        {
            case "ConfigurarVelocidad":
                var speed = (int)userAction["speed"];
                code = EpsonFiscalInterface.ConfigurarVelocidad(speed);
                break;
            case "ConfigurarPuerto":
                var port = (string)userAction["port"];
                code = EpsonFiscalInterface.ConfigurarPuerto(port);
                break;
            case "Conectar":
                code = EpsonFiscalInterface.Conectar();
                break;
            case "Desconectar":
                code = EpsonFiscalInterface.Desconectar();
                break;
            case "ImprimirCierreX":
                code = EpsonFiscalInterface.ImprimirCierreX();
                break;
            case "ImprimirCierreZ":
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

    // ImprimirCierreX()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int ImprimirCierreX();

    // ImprimirCierreZ()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int ImprimirCierreZ();

}
