class ProductItem {

	constructor() {
        let data = this.fetchDataFromServer();

        if (data === undefined) {
            console.log("Данные не получены");
        } else {
            this.setName(data.displayedName.displayedName.value[0]);
            this.setStocks(data.stock.stocks);
            this.setCurrentRegion(Object.keys(data.stock.stocks)[0]);
        }
    }

    fetchDataFromServer() {
        let data = {
            displayedName: {
                displayedName: {
                    value: ["Профиль маячковый ПВХ 10 мм L3м"],
                    description: "Полное наименование товара для клиента"
                }
            },
            stock: {
                stocks: {
                    34: {
                        2: "35",
                        3: "42",
                        4: "58",
                        5: "57",
                        6: "112",
                        20: "51",
                        22: "78",
                        26: "34",
                        32: "22",
                        35: "358",
                        40: "28",
                        43: "68",
                        45: "58",
                        49: "31",
                        51: "29",
                        56: "42",
                        62: "26",
                        64: "0",
                        65: "57",
                        86: "15",
                        114: "41",
                        117: "46",
                        143: "46",
                        162: "4",
                        171: "0",
                        176: "12"
                    }
                }
            }
        };
        return data;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setStocks(stocks) {
        this.stocks = stocks;
    }

    getStocks() {
        return this.stocks;
    }

    getStocksFromCurrentRegion() {
        return this.stocks[this.currentRegion];
    }

    setCurrentRegion(id) {
        this.currentRegion = id;
    }

    getCurrentRegion() {
        return this.currentRegion;
    }

    getAvailableMarketsInCurrentRegion() {
        let result = [];
        let stocks = this.getStocksFromCurrentRegion();

        Object.entries(stocks).forEach((el) => {
            if (el[1] != 0) {
                result.push(el[0]);
            }
        });
        return result;
    }

    getMarketWhereMaxItems() {
        let max = 0;
        let result = [];
        let stocks = this.getStocksFromCurrentRegion();

        Object.entries(stocks).forEach((el) => {
            let value = parseInt(el[1]);
            if (value > max) {
                max = value;
                result = el;
            }
        });
        return result;
    }
}

try {
    let product = new ProductItem();

    let productName = product.getName();
    let availableMarkets = product.getAvailableMarketsInCurrentRegion();
    let market = product.getMarketWhereMaxItems();

    console.log("Имя товара: " + productName);
    console.log("Магазины где товар доступен:\n" + availableMarkets);
    console.log("Магазин с максимальным количеством: " + market[0] + "(" + market[1] + " шт.)");
} catch (error) {}
