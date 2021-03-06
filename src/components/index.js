"use strict"
const router = require("express").Router();

const routerList = {
    "brand": "brand/brandAPI",
    "outlet": "outlet/outletAPI",
    "product": "product/productAPI"
}

for (let item in routerList) {
    router.use(
        "/" + item,
        require("../../src/components/" + routerList[item])
    )
}

module.exports = router