REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;
REVOKE ALL ON FUNCTION public.can_edit_content(uuid) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;
GRANT EXECUTE ON FUNCTION public.can_edit_content(uuid) TO service_role;