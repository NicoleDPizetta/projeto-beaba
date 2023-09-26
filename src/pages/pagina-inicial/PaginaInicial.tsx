import { CardTemplate, Header } from "../../shared/components"
import { LayoutBase } from "../../shared/layouts"

export const PaginaInicial = () => {
    return (
            <LayoutBase titulo="Página Inicial" header={<Header />}>
                <CardTemplate />
            </LayoutBase>
    )
}