var express = require('express');
var router = express.Router();

const products = [
    {
        id: 1,
        name: 'MacBook Air (Retina)',
        imageUrl: 'https://www.apple.com/v/mac/compare/m/images/overview/compare_macbook_air_retina_spacegray__era7vec2t6qa_large_2x.jpg',
        price: 36900,
        isOnSale: false,
        quantityInCart: 0
    },
    {
        id: 2,
        name: 'MacBook Pro 13 吋',
        imageUrl: 'https://www.apple.com/v/mac/compare/m/images/overview/compare_macbook_pro_13_spacegray__jy60myikwne6_large_2x.jpg',
        price: 42900,
        isOnSale: false,
        quantityInCart: 0
    },
    {
        id: 3,
        name: 'MacBook Pro 16 吋',
        imageUrl: 'https://www.apple.com/v/mac/compare/m/images/overview/compare_macbook_pro_16_spacegray__dx8anpw8a9qq_large_2x.jpg',
        price: 77900,
        isOnSale: true,
        quantityInCart: 0
    }
];

router.get('/', (req, res) => {
    var query = (req.query['q'] || '').toLowerCase();
    if (query) {
        const foundProducts = products.filter(
            (product) => product.name.toLowerCase().indexOf(query) !== -1);
        return res.status(200).json(foundProducts);
    }
    return res.status(200).json(products);
});

router.post('/', (req, res) => {
    let product = req.body;

    if (product.id) {
        return res.status(400)
            .json({msg: 'Product seems to already have an id assigned'});
    }

    product.id = products.length + 1;
    product.quantityInCart = 0;
    products.push(product);
    return res.status(200).json(product);
});

router.patch('/:id', (req, res) => {
    let productId = req.params.id;
    const foundProduct = products.find((product) => product.id == productId);
    if (foundProduct) {
        let changeInQuantity = req.body.changeInQuantity;
        foundProduct.quantityInCart += changeInQuantity;
        return res.status(200).json({msg: 'Successfully updated cart'});
    }
    return res.status(400).json({msg: 'Product with id ' + productId + ' not found.'});
});

module.exports = router;
