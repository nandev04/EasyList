export function getErrorMessage(err) {
    return err instanceof Error ? err.message : String(err);
}
