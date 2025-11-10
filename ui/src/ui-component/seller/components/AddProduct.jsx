import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddProductMutation } from "@/ui-component/products/productsApi";
import { useState } from "react";
import { toast } from "react-toastify";

export const AddProduct = () => {
  const [submitProduct, { isLoading, error: isError }] = useAddProductMutation();
  const [product, setProduct] = useState({ name: "", description: "", price: "", file: null });
  const user = JSON.parse(localStorage.getItem("seller"));

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      console.log("user.data.id==>", user.data.id);
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("file", product.file);
      formData.append("ownerId", user.data.id);
      console.log("Product Data==>", product);
      //
      console.log("Loading", isLoading);
      const res = await submitProduct(formData).unwrap();
      toast.success("Product added!");
      setProduct({ name: "", description: "", price: "", file: null });
      console.log("res==>", res);
    } catch (error) {
      console.log("isError==>", isError);
      console.log("Error==>", error);
    }
  };
  console.log("Loading", isLoading);

  return (
    <div className="flex justify-center py-5">
      <Card className="w-md bg-gray-500 border-none rounded-sm text-white">
        <CardHeader>
          <CardTitle>You're registering as a seller</CardTitle>
          <CardAction className="flex items-center gap-1"></CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddProduct}>
            <div className="flex flex-col gap-6">
              {/* name */}

              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  id="name"
                  type="name"
                  placeholder="m@example.com"
                  required
                />
              </div>

              {/* description */}
              <div className="grid gap-2">
                <Label htmlFor="price">Description</Label>
                <Input
                  value={product.description}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                  id="description"
                  type="text"
                  placeholder="Enter product description"
                  required
                />
              </div>
              {/* price */}
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: e.target.value })}
                  id="price"
                  type="number"
                  placeholder="Enter product price"
                  required
                />
              </div>
              {/* file file */}
              <div className="grid gap-2">
                <Label htmlFor="file">Choose File</Label>
                <Input
                  onChange={(e) => setProduct({ ...product, file: e.target.files[0] })}
                  id="file"
                  type="file"
                  accept="file/*"
                  placeholder="Choose file"
                />
              </div>
              <div className="grid gap-2">
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-400">
                  {isLoading ? "Adding Product..." : "+ Add Product"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
