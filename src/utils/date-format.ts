export const dateFormat = (date: string) => {
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeZone: 'America/Sao_Paulo'
    })
    return formattedDate.format(new Date(date))
}