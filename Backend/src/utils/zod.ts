import z from 'zod';

export const TodoSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(5),
});
export const TodoUpdateSchema = z.object({
    title: z.string().min(2).optional(),
    description: z.string().min(5).optional(),
    complate: z.boolean().optional()
});
