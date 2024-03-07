export const dateFormat = (date: string) => {
    console.log('date', date)
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeZone: 'America/Sao_Paulo'
    })
    return formattedDate.format(new Date(date))
}