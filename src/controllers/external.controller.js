const EXT_URL = 'https://swapi.dev/api/people';

export const getExternalCatalogItems = (req, res) => {
    const URL = EXT_URL;
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            const listOfNames = getListOfNames(data.results);
            res.json(listOfNames);
        })
        .catch(err => {
            res.status(500).json({ error: "Failed to retrieve external catalog items" });
        });
}

function getListOfNames(data) {
    return data.map(item => item.name);
}

const localDetailsCopy = new Map();
const TTL = 30 * 1000; // 20 segundos

// Solo admite ids entre 1 y 10
export const getExternalItemDetail = (req, res) => {
    const { id } = req.params;

    if (id < 1 || id > 10) {
        return res.status(400).json({ error: "Invalid ID. Only IDs between 1 and 10 are allowed." });
    }
    console.log("In memory",localDetailsCopy.size);
    if (localDetailsCopy.has(id) && (Date.now() - localDetailsCopy.get(id).fetchedAt) < TTL) {
        console.log("Cache hit");
        return res.json(localDetailsCopy.get(id));
    }

    const URL = `${EXT_URL}/${id}`;
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            data.fetchedAt = Date.now();
            localDetailsCopy.set(id, data);
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ error: "Failed to retrieve external catalog item detail" });
        });
}