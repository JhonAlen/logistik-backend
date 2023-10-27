import hedgingNotesService from '../service/hedgingNotesService.js';

const searchHedgingNotes = async (req, res) => {
    const search = await hedgingNotesService.searchHedgingNotes();
    if (search.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: search.permissionError
            });
    }
    if (search.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: search.error
            });
    }

    const formattedList = search.map((item) => ({
        ...item,
        fdesde: item.fdesde ? new Date(item.fdesde).toLocaleDateString('es-ES') : null,
        fhasta: item.fhasta ? new Date(item.fhasta).toLocaleDateString('es-ES') : null,
      }));

    return res
        .status(200)
        .send({
            status: true,
            data: {
                list: formattedList
            }
        });
}

const detailHedgingNotes = async (req, res) => {
    const detail = await hedgingNotesService.detailHedgingNotes(req.body);
    if (detail.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: detail.permissionError
            });
    }
    if (detail.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: detail.error
            });
    }

    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return res
        .status(200)
        .send({
            status: true,
            data: {
                cnota: detail.cnota,
                xtipo: detail.xtipo,
                xasegurado: detail.xasegurado,
                xdireccion: detail.xdireccion,
                xcedente: detail.xcedente,
                xdireccion_ced: detail.xdireccion_ced,
                fdesde: formatDate(new Date(detail.fdesde)),
                fhasta: formatDate(new Date(detail.fhasta)),
                xinteres: detail.xinteres,
                xmarca: detail.xmarca,
                xmatricula: detail.xmatricula,
                xserial: detail.xserial,
                nano: detail.nano,
                nasientos: detail.nasientos,
                nasientos_tripulantes: detail.nasientos_tripulantes,
                xdatos_tecnicos: detail.xdatos_tecnicos,
                xlimites: detail.xlimites,
                xcondiciones: detail.xcondiciones,
                xprimas_tasas: detail.xprimas_tasas,
                xterminos: detail.xterminos
            }
        });
}

export default {
    searchHedgingNotes,
    detailHedgingNotes
}
