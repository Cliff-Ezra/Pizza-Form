"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const items = [
  {
    id: "cheese",
    label: "Cheese",
  },
  {
    id: "pepperoni",
    label: " Pepperoni",
  },
  {
    id: "ham",
    label: "Ham",
  },
  {
    id: "pineapple",
    label: "Pineapple",
  },
  {
    id: "sausage",
    label: "Sausage",
  },
  {
    id: "feta cheese",
    label: "Feta Cheese",
  },
  {
    id: "tomatoes",
    label: "Tomatoes",
  },
  {
    id: "olives",
    label: "Olives",
  },
] as const;

const displayFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

type DisplayFormValues = z.infer<typeof displayFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<DisplayFormValues> = {
  items: ["recents", "home"],
};

export function DisplayForm() {
  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues,
  });

  function onSubmit(data: DisplayFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={(field) => (
            <FormItem>
              <div className="mb-3">
                <FormLabel className="text-base">
                  Mmm... Must be the Pizza🍕
                </FormLabel>
                <FormDescription>
                  Select the Pizza Size you want.
                </FormDescription>
              </div>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">Large</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="mentions" />
                    </FormControl>
                    <FormLabel className="font-normal">Medium</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal">Small</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <div className="mb-4">
                <FormLabel className="text-base">
                  Select your Favorite Topping🍕
                </FormLabel>
              </div>
              {items.map((item, index) => (
                <div key={item.id}>
                  {index === 0 && (
                    <FormDescription>Basic Toppings</FormDescription>
                  )}
                  {index === 4 && (
                    <FormDescription>Deluxe Toppings</FormDescription>
                  )}
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox value={item.id} onChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="font-normal">{item.label}</FormLabel>
                  </FormItem>
                </div>
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add to Cart</Button>
      </form>
    </Form>
  );
}
