class OrderModel {
  static mapFromRequest(body) {
    return {
      orderId: body.numeroPedido,
      value: body.valorTotal,
      creationDate: new Date(body.dataCriacao),
      items: body.items.map(item => ({
        productId: parseInt(item.idItem),
        quantity: item.quantidadeItem,
        price: item.valorItem
      }))
    };
  }
}
module.exports = OrderModel;