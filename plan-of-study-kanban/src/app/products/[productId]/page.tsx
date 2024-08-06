type Params = {
    params: {
      productId: string;
    };
    searchParams: object;
  };

export default function ProductDetails(e : Params){
    return <h1>Details about product {e.params.productId}</h1>;
}