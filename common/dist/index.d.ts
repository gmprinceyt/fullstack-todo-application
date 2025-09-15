import { z } from 'zod';
export declare const TodoSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
}, z.core.$strip>;
export declare const TodoUpdateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    complate: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type TodoSchemaF = z.infer<typeof TodoSchema>;
export type TodoUpdateSchemaF = z.infer<typeof TodoUpdateSchema>;
