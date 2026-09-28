# Admin Panel Setup

Routes added:
- `/admin/login` — Supabase email/password login
- `/admin` — add, edit and delete properties

The app uses the existing Vercel variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Required `properties` RLS policies:
- Public SELECT
- Authenticated INSERT with `WITH CHECK (true)`
- Authenticated UPDATE with `USING (true)` and `WITH CHECK (true)`
- Authenticated DELETE with `USING (true)`

## Storage upload policy

The `property-images` bucket is public for reading, but authenticated uploads also need an INSERT policy on `storage.objects`.
Create a Storage policy that allows INSERT for `authenticated` users only when `bucket_id = 'property-images'`.

SQL equivalent:

```sql
create policy "Authenticated users can upload property images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'property-images');
```

Without this Storage INSERT policy, property CRUD still works, but the Admin Panel's image upload control will show an upload permission error. You can still paste an existing public image URL into the Image URL field.
